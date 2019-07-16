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

        [HttpGet("[action]")]
        public IActionResult GetNewsTypes()
        {
            return Ok(_context.NewsTypes.ToList());
        }

        [HttpGet("[action]")]
        public IActionResult GetNewsRegions()
        {
            return Ok(_context.NewsRegions.ToList());
        }

        [HttpPost("[action]")]  
        public IActionResult GetCategoriesFromClient([FromBody]int[] categoriesFromInput)
        {
            if(categoriesFromInput[1] != 0)
            _context.Notifications.FirstOrDefault(c => c.Id == categoriesFromInput[0]).IdType = categoriesFromInput[1];
            if (categoriesFromInput[2] != 0)
                _context.Notifications.FirstOrDefault(c => c.Id == categoriesFromInput[0]).IdRegion = categoriesFromInput[2];

            _context.SaveChanges();
            return Ok();
        }
    }
}
