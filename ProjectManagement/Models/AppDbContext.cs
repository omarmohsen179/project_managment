using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ProjectManagement.Models
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Project> Projects { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new QuestionConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationUserConfiguration());
            SeedRoles(modelBuilder);

        }

        private void SeedRoles(ModelBuilder builder)
        {


            builder.Entity<IdentityRole>().HasData(
            new IdentityRole() { Id = "0E50AF81-221B-43A5-9DA0-B0F2CF5A7DD2", Name = RolesHelpers.Employee, ConcurrencyStamp = "5", NormalizedName = RolesHelpers.Employee },
            new IdentityRole() { Id = "0E50AF81-221B-43A5-9DA0-B0F2CF5A7DL9", Name = RolesHelpers.Manager, ConcurrencyStamp = "10", NormalizedName = RolesHelpers.Manager }
            );

            builder.Entity<Project>().HasData(
        new Project() { Id = 1, ProjectName = "Home" });

            builder.Entity<Task>().HasData(new Task()
            {
                Id = 1,
                ProjectId = 1,
                TaskName = "TaskName"
            });
        }

    }
}
