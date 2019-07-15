using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace News.Model
{
    public class Notification
    {
        public int Id { get; set; }
        public bool IsRead { get; set; }
        public string Header { get; set; }
        public string Text { get; set; }

        public int? IdType { get; set; }
        [ForeignKey("IdRegion")]
        public int? IdRegion { get; set; }
        public NewsRegion NewsRegion { get; set; }
        private const string chars = "abcdefg hijklmn opqrs tuvwxyz ";


        public static string TextRandom(Random random, int lengthText)
        {
            string text = "";
            for (int i = 0; i < lengthText; i++)
            {
                text += chars[random.Next(chars.Length)];
            }
            return text;
        }
        public static string HeaderRandom(Random random, int lengthHeader)
        {
            string text = "";
            for (int i = 0; i < lengthHeader; i++)
            {
                text += chars[random.Next(chars.Length)];
            }
            return text;
        }
    }
}
