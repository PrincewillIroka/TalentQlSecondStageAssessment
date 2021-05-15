export function successMessage(title) {
	return { success: true, message: title };
}

export function successData(data) {
	return { success: true, payload: data };
}

export function errorMessage(error) {
  const message = error['message'] ? error['message'] : 'Internal server error';
	return { success: false, message };
}

export function errorData(data) {
	return { success: false, data };
}
