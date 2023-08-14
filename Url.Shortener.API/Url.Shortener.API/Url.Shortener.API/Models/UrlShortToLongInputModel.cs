using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Url.Shortener.API.Models
{

    public class UrlShortToLongInputModel
    {
        public string? ShortUrl { get; set; }
    }
}
