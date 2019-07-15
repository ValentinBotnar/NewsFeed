using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace News.Model
{
    public class NewsRegion
    {
        public int Id { get; set; }
        public string NameNewsRegion { get; set; }

        public List<Notification> Notifications { get; set; }
    }
}
