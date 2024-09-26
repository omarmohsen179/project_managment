using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace ProjectManagement.Services.ImageUploader
{
    public interface IimageUploader
    {
        public ImageUpladerReturn UploadFormFile(IFormFile File);
        public ImageUpladerReturn UploadByteArray(string File);
        public string NextImageNumber(IFormFile File);
        public string base64getextention(string data);
        public List<T> UploadImagesList<T>(List<IFormFile> ImagesList, Func<string, T> implement = null);
    }
}
