using System;

namespace backend.Models;

public class Result<T>
{
    public bool Success { get; init; }
    public T? Data;
    public int Status;
    public string? Message { get; init; }

    public static Result<T> Ok(T data, string message = "", int status=200)
    {
        return new()
        {
            Success = true,
            Data = data,
            Message = message,
            Status = status
        };
    }

    // Overload Ok function, no Data required

    public static Result<T> Ok(string message = "Success", int status = 200)
    {
        return new()
        {
            Success = true,
            Message = message,
            Status = status
        };
    }

    public static Result<T> Fail(string message, int status = 500)
    {
        return new()
        {
            Success = false,
            Message = message,
            Status = status
        };
    }

    // Overload Fail function to account for Exception handeling
    public static Result<T> Fail(Exception e, int status = 500)
    {
        return new()
        {
            Success = false,
            Message = e.Message,
            Status = status
        };
    }

    public T GetData()
    {
        if (!Success)
        {
            throw new InvalidOperationException($"Cannot get data of failed operation: {Message}");
        }
        return Data!;
    }
}