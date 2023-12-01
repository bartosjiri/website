export const removeUrlProtocol = (url: string) => {
	return url.replace(/^(https?):\/\//, '');
};
