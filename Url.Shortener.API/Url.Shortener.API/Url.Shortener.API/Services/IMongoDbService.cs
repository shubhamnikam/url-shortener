using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Url.Shortener.API.Services
{
    public interface IMongoDbService
    {
        public IMongoDatabase GetMongoDatabase(string databaseName);
        public IMongoCollection<T> GetMongoCollection<T>(string collectionName, string databaseName = "");
    }
}
