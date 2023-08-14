using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Url.Shortener.API.Models
{
    public class UrlLongToShortInputModel
    {
        public string? LongUrl { get; set; }
    }
}
