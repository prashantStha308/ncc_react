using System;

namespace backend.Constants;

public static class ErrorMessages
{
    public static string ItemNotFoundWithId(string itemLabel, Guid itemId) => $"{itemLabel} with ID {itemId} not present in Database ";
    public static string ItemNotFound(string itemLabel) => $"{itemLabel} not present in Database ";
}