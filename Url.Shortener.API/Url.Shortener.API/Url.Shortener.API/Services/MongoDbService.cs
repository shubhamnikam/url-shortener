using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Url.Shortener.API.Options;

namespace Url.Shortener.API.Services
{
    public class MongoDbService : IMongoDbService
    {
        private readonly ExtraConfigOptions extraConfigOptions;
        private readonly MongoClient mongoClient;
        private IMongoDatabase mongoDatabase;

        public MongoDbService(IOptions<ExtraConfigOptions> extraConfigOptions)
        {
            this.extraConfigOptions = extraConfigOptions.Value;
            this.mongoClient = new MongoClient(extraConfigOptions.Value.MongoDbConfig.ConnectionString);
            this.mongoDatabase = GetMongoDatabase(extraConfigOptions.Value.MongoDbConfig.DefaultDatabaseName);
        }

        public IMongoDatabase GetMongoDatabase(string databaseName)
        {
            if (this.mongoClient is not null)
            {
                return mongoClient.GetDatabase(databaseName);
            }
            throw new MongoClientException("Mongo client is null");
        }

        public IMongoCollection<T> GetMongoCollection<T>(string collectionName, string databaseName = "")
        {
            databaseName = databaseName ?? this.extraConfigOptions.MongoDbConfig.DefaultDatabaseName;
            collectionName = collectionName ?? this.extraConfigOptions.MongoDbConfig.DefaultCollectionName;
            if (this.mongoDatabase is null)
            {
                mongoDatabase = GetMongoDatabase(databaseName);
            }
            return mongoDatabase.GetCollection<T>(collectionName);
        }
    }

}