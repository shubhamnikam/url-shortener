using Microsoft.EntityFrameworkCore;
using Url.Shortener.API.Models;

namespace Url.Shortener.API.Repositories
{
    public class UrlDbContext : DbContext
    {
        public DbSet<UrlModel> Urls { get; set; }
        public UrlDbContext(DbContextOptions<UrlDbContext> options) : base(options)
        {

        }


    }
}
