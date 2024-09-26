using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ProjectManagement.Helpers
{

    public class ImageUpladerReturn
    {
        public bool isOk { get; set; }
        public string value { get; set; }
    }

    public class ImageUploder
    {
        public static IWebHostEnvironment _enviroment;

        public ImageUploder(IWebHostEnvironment enviroment)
        {
            _enviroment = enviroment;
        }

        public ImageUpladerReturn UplodeFile(IFormFile File)
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
                        isOk = true,
                        value = filename
                    };
                }
                else
                {
                    return new ImageUpladerReturn()
                    {
                        isOk = false,
                        value = ("Failed")
                    };
                }
            }
            catch (Exception ex)
            {
                return new ImageUpladerReturn()
                {
                    isOk = false,
                    value = ex.Message.ToString()
                };
            }

        }
        public ImageUpladerReturn UplodeFileButeArray(string File)
        {

            if (File.Contains("data:image/png;base64,")) {
                File = File.Replace("data:image/png;base64,", String.Empty);
            }
            if (File.Contains("data:image/jpeg;base64,"))
            {
                File = File.Replace("data:image/jpeg;base64,", String.Empty);
            }

            try {
                string extetion = base64getextention(File.Substring(0, 5));
                if (extetion.Length == 0)
                {

                    return new ImageUpladerReturn()
                    {
                        isOk = false,
                        value = "need extention"
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
                    isOk = true,
                    value = ("\\Uplode\\" + imagename)
                };
            }
            catch (Exception ex)
            {
                return new ImageUpladerReturn()
                {
                    isOk = false,
                    value = ex.Message.ToString()
                };
            }

        }
        public string base64getextention(string data) {


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
    }
    }

