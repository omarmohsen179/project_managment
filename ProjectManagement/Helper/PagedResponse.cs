using Azure;
using System.Collections.Generic;

namespace ProjectManagement.Helper
{
    public class PagedResponse<T> : Response<T>
    {
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int PagesCount { get; set; }
        public int PageIndex { get; set; }
        public List<T> Data { get; set; }

        public PagedResponse()
        {
            this.Message = null;
            this.Succeeded = true;

        }
    }
}
