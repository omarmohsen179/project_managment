using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;


namespace ProjectManagement.Services.ImageUploader
{
    public class ImageUpladerReturn
    {
        public bool IsOk { get; set; }
        public string Value { get; set; }
    }
    public class ImageUploader: IimageUploader
    {
        public static IWebHostEnvironment _enviroment;

        public ImageUploader(IWebHostEnvironment enviroment)
        {
            _enviroment = enviroment;
        }
        public ImageUpladerReturn UploadFormFile(IFormFile File)
        {
            try
            {
                if (File.IsImage() && File != null && File.Length > 0)
                {
                    if (!Directory.Exists(_enviroment.WebRootPath + "\\Uplode\\"))
                    {
                        Directory.CreateDirectory(_enviroment.WebRootPath + "\\Uplode\\");
                    }

                    System.Guid guid = System.Guid.NewGuid();
                    string imagename = guid.ToString() + Path.GetExtension(File.FileName);
                    var filename = "\\Uplode\\" + imagename;
                    using FileStream fileStream = System.IO.File.Create(_enviroment.WebRootPath + filename);
                    File.CopyTo(fileStream);
                    fileStream.Flush();

                    return new ImageUpladerReturn()
                    {
                        IsOk = true,
                        Value = filename
                    };
                }
                else
                {
                    return new ImageUpladerReturn()
                    {
                        IsOk = false,
                        Value = ("Failed")
                    };
                }
            }
            catch (Exception ex)
            {
                return new ImageUpladerReturn()
                {
                    IsOk = false,
                    Value = ex.Message.ToString()
                };
            }

        }
        public ImageUpladerReturn UploadByteArray(string File)
        {

            if (File.Contains("data:image/png;base64,"))
            {
                File = File.Replace("data:image/png;base64,", String.Empty);
            }
            if (File.Contains("data:image/jpeg;base64,"))
            {
                File = File.Replace("data:image/jpeg;base64,", String.Empty);
            }

            try
            {
                string extetion = base64getextention(File.Substring(0, 5));
                if (extetion.Length == 0)
                {

                    return new ImageUpladerReturn()
                    {
                        IsOk = false,
                        Value = "need extention"
                    };
                }
                System.Guid guid = System.Guid.NewGuid();
                string imagename = guid.ToString() + "." + extetion;
                using (MemoryStream ms = new MemoryStream(Convert.FromBase64String(File)))
                {
                    using (Bitmap bm2 = new Bitmap(ms))
                    {

                        bm2.Save(_enviroment.WebRootPath + "\\Uplode\\" + imagename);
                    }
                }
                return new ImageUpladerReturn()
                {
                    IsOk = true,
                    Value = ("\\Uplode\\" + imagename)
                };
            }
            catch (Exception ex)
            {
                return new ImageUpladerReturn()
                {
                    IsOk = false,
                    Value = ex.Message.ToString()
                };
            }

        }
        public string base64getextention(string data)
        {


            switch (data.ToUpper())
            {
                case "IVBOR":
                    return "png";
                case "/9J/4":
                    return "jpg";
                case "AAABA":
                    return "ico";
                default:
                    return string.Empty;
            }
        }

        public string NextImageNumber(IFormFile File)
        {
            string[] fileArray = Directory.GetFiles(_enviroment.WebRootPath + "\\Uploads\\");
            List<int> fileNumbers = new List<int>();
            foreach (string file  in fileArray)
            {
                var ra = file.Replace(_enviroment.WebRootPath + "\\Uploads\\", "");
                var mystring = ra.Substring(0, ra.IndexOf('.'));
                try
                {
                    int num = int.Parse(mystring);
                    fileNumbers.Add(num);
                }
                catch (Exception ex)
                {
                }

            }
            int NextNumber = fileNumbers.Max() + 1;
            string imagename = NextNumber.ToString() + Path.GetExtension(File.FileName);
            return imagename;   
        }

        public  List<T> UploadImagesList<T>(List<IFormFile> ImagesList, Func<string, T> implement = null)
        {
            List<T> allimages = new List<T>();
            foreach (IFormFile el in ImagesList)
            {
                var result = UploadFormFile(el);
                if (result.IsOk)
                {

                   allimages.Add(implement(result.Value));
                }
                else
                {
                    return null;
                }

            }
            return allimages;
        }
    }
}
