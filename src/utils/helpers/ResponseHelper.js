export function successMessage(title) {
  return { success: true, message: title };
}

export function successData(data) {
  return { success: true, payload: data };
}

export function errorMessage(title) {
  return { success: false, message: title };
}

export function errorData(data) {
  return { success: false, data };
}

export function serverError() {
  return { success: false, message: "Internal server error" };
}
