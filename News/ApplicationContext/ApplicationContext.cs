using Microsoft.EntityFrameworkCore;
using News.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlNotifications.Model
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Notification> Notifications { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            //Database.EnsureCreated();
        }
    }
}
