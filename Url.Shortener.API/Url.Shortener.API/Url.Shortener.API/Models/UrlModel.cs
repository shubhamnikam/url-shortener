using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Url.Shortener.API.Models
{
    [Table("Urls")]
    public class UrlModel : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string? ShortUrl { get; set; }
        [Required]
        public string? LongUrl { get; set; }
        [Required]
        public int Count { get; set; }
    }

    public class UrlLongToShortInputModel
    {
        public string? LongUrl { get; set; }
    }

    public class UrlShortToLongInputModel
    {
        public string? ShortUrl { get; set; }
    }
}
