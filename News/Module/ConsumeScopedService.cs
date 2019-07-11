using News.Model;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ControlNotifications.Model;

namespace ControlNotifications.Hub
{
    public class ConsumeScopedService : Microsoft.AspNetCore.SignalR.Hub, IHostedService, IDisposable
    {
        private readonly IHubContext<ConsumeScopedService> _hubContext;
        public Notification[] arrayOfAllNews;
        public ConsumeScopedService(IServiceProvider services, IHubContext<ConsumeScopedService> hubContext)
        {
            Services = services;
            _hubContext = hubContext;

            using (var scope = Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
                var list = context.Notifications;
                _hubContext.Clients.All.SendAsync("ReceiveMessageAllNews", list);
            }
        }

        private Timer _timer;

        public IServiceProvider Services { get; }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(20));
            return Task.CompletedTask;
        }

        private async void DoWork(object state)
        {
            using (var scope = Services.CreateScope())
            {
                Random random = new Random();
                var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

                Notification notice = new Notification() { Id = random.Next(), IsRead = false, Header = Notification.HeaderRandom(random, 10), Text = Notification.TextRandom(random, 100) };
                context.Notifications.Add(notice);
                context.SaveChanges();
                await _hubContext.Clients.All.SendAsync("ReceiveMessage", notice.Id, notice.Header, notice.Text);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
