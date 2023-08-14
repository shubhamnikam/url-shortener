namespace Url.Shortener.API.Entities
{
    public class BaseEntity
    {
        public bool IsActive { get; set; }
        public DateTime CreatedTimestamp { get; set; }
    }
}
