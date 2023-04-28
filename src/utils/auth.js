const TokenKey = 'sa-token'

export function getToken() {
	return this.$cookies.get(TokenKey);
}

export function setToken(token){
	return this.$cookies.set(TokenKey, token, {expires:30});
}

export function removeToken(){
	this.$cookies.remove(TokenKey);
}