namespace Url.Shortener.API.Options
{
    public class ExtraConfigOptions
    {
        public MongoDbConfig MongoDbConfig { get; set; }
    }


    public class MongoDbConfig
    {
        public string ConnectionString { get; set; }

        public string DefaultDatabaseName { get; set; }

        public string DefaultCollectionName { get; set; }
    }
}
