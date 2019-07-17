using Microsoft.EntityFrameworkCore;
using News.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace News.Model
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NewsType> NewsTypes { get; set; }
        public DbSet<NewsRegion> NewsRegions { get; set; }
        public DbSet<NewsTypesKind> NewsTypesKinds { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            //Database.EnsureCreated();
        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Notification>()
        //        .HasOne(p => p.NewsRegion)
        //        .WithMany(t => t.Notifications)
        //        .HasForeignKey(p => p.IdRegion)
        //        .HasPrincipalKey(t => t.Id);
        //}
    }
}
