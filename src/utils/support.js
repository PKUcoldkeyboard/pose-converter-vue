const SupportKey='supportKey'

export function getSupport(){
	return this.$cookies.get(SupportKey)
}

export function setSupport(isSupport){
	return this.$cookies.set(SupportKey,isSupport,{expires:3})
}

export function setCookie(key,value,expires){
	return this.$cookies.set(key,value,{expires:expires})
}

export function getCookie(key){
	return this.$cookies.get(key)
}