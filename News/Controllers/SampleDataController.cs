using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using News.Model;

namespace News.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private ApplicationContext _context;

        public SampleDataController(ApplicationContext context)
        {
            _context = context;
        }
        
        [HttpGet("[action]")]
        public IActionResult SendAllNewsFromDB()
        {
            return Ok(_context.Notifications.ToList());
       
        }
 
        [HttpPost("[action]")]
        public IActionResult GetOneNewsById([FromBody]Notification idOneNewsObject)
        {
           
            return Ok(_context.Notifications.FirstOrDefault(c => c.Id == idOneNewsObject.Id));

        }

        [HttpPost("[action]")]
        public IActionResult GetInfoNewsCategories([FromBody]Notification idOneNewsObject)
        {
            var listNewsTypes = _context.NewsTypes.ToList();
            var listNewsRegions = _context.NewsRegions.ToList();
            var listNewsTypesKind = _context.NewsTypesKinds.ToList();
            var objectSelectedNews = _context.Notifications.FirstOrDefault(c => c.Id == idOneNewsObject.Id);
            return Json(new { listNewsTypes, listNewsRegions, listNewsTypesKind, objectSelectedNews });
        }

        [HttpPost("[action]")]  
        public IActionResult GetCategoriesFromClient([FromBody]int?[] categoriesFromInput)
        {
            _context.Notifications.FirstOrDefault(c => c.Id == categoriesFromInput[0]).IdType = categoriesFromInput[1];
            _context.Notifications.FirstOrDefault(c => c.Id == categoriesFromInput[0]).IdRegion = categoriesFromInput[2];

            _context.SaveChanges();
            return Ok();
        }
    }
}
