namespace Url.Shortener.API.Models
{
    public class BaseModel
    {
        public bool IsActive { get; set; }
        public DateTime CreatedTimestamp { get; set; }
    }
}
