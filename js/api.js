module.exports={
	save: (store)=>{
		//TODO better to surround it by try-catch 
		localStorage.setItem('store', JSON.stringify(store));
	},
	load: ()=>{
		return JSON.parse(localStorage.getItem('store'));
	}
};
