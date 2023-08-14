using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Url.Shortener.API.Entities
{
    public class UrlEntity : BaseEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string Id { get; set; }

        [BsonElement("ShortUrl")]
        public string? ShortUrl { get; set; }

        [BsonElement("LongUrl")]
        public string? LongUrl { get; set; }

        [BsonElement("Count")]
        public int Count { get; set; }
    }
}
