using System;

namespace backend.Helpers;

public class ApiError : Exception
{
    public int Status { get; }
    public ApiError(string message, int status = 500) : base(message)
    {
        Status = status;
    }
}