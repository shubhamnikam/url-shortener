using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Url.Shortener.API.Entities;
using Url.Shortener.API.Models;
using Url.Shortener.API.Service;
using Url.Shortener.API.Utilities;

namespace Url.Shortener.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlController : ControllerBase
    {
        private readonly ILogger<UrlController> logger;
        private readonly IUrlService urlService;

        public UrlController(ILogger<UrlController> logger, IUrlService urlService)
        {
            this.logger = logger;
            this.urlService = urlService;
        }

        [HttpPost("CreateShortUrl")]
        public async Task<ActionResult<UrlEntity>> CreateShortUrl([FromBody] UrlLongToShortInputModel inputModel)
        {
            try
            {
                if (string.IsNullOrEmpty(inputModel.LongUrl))
                {
                    throw new Exception($"longUrl is empty or null");
                }
                // encode url
                //longUrl = System.Web.HttpUtility.UrlEncode(longUrl);

                var result = await urlService.CreateShortUrl(inputModel.LongUrl);

                // decode url
                if (result is not null)
                {
                    result.LongUrl = System.Web.HttpUtility.UrlDecode(result.LongUrl);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { msg = $"{ex.Message}" });
            }
        }

        [HttpPost("GetLongUrl")]
        public async Task<ActionResult<UrlEntity>> GetLongUrl([FromBody] UrlShortToLongInputModel model)
        {
            try
            {
                var result = await urlService.GetLongUrlByShortUrl(model.ShortUrl);
                if (result is null)
                {
                    throw new Exception($"No url found for: {model.ShortUrl}");
                }

                //decode url
                result.LongUrl = System.Web.HttpUtility.UrlDecode(result.LongUrl);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { msg = $"{ex.Message}" });
            }
        }

        [HttpGet("GetTrendingUrls/{noOfResult}")]
        public async Task<ActionResult<UrlEntity>> GetTrendingUrls([FromRoute] int noOfResult)
        {
            try
            {
                if (noOfResult > AppConstants.MAX_NO_OF_RESULT) { noOfResult = AppConstants.MAX_NO_OF_RESULT; }

                var result = await urlService.GetTrendingUrls(noOfResult);

                // decode url
                if (result is not null)
                {
                    foreach (var item in result)
                    {
                        item.LongUrl = System.Web.HttpUtility.UrlDecode(item.LongUrl);
                    }
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { msg = $"{ex.Message}" });
            }
        }

    }
}
