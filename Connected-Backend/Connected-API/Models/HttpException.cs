using System;
using System.Net;

namespace Connected.Models
{
    public class HttpException : Exception
    {
        public int StatusCode { get; }

        public HttpException(int httpStatusCode, string message) : base(message)
        {
            StatusCode = ParseHttpStatusCode(httpStatusCode);
        }
        public HttpException(HttpStatusCode statusCode, string message) : base(message)
        {
            StatusCode = (int) statusCode;
        }
        public HttpException(int httpStatusCode, string message, Exception inner) : base(message, inner)
        {
            StatusCode = ParseHttpStatusCode(httpStatusCode);
        }
        public HttpException(HttpStatusCode httpStatusCode, string message, Exception inner) : base(message, inner)
        {
            StatusCode = (int) httpStatusCode;
        }

        private static int ParseHttpStatusCode(int code)
        {
            int statusCode = code;
            bool isValid = Enum.TryParse(code.ToString(), out HttpStatusCode httpStatusCode);
            if (!isValid)
                statusCode = (int) HttpStatusCode.BadRequest;
            return statusCode;
        }
    }
}