const DOMAIN = "http://localhost:3005";

export const fetchPosts = async(params)=>{
  let url = DOMAIN+'/api/posts';
  try{
    var result = await fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  }
    })
  }catch(e){
    console.log(e);
  }
 return result.json();
}

export const deletePost = async(postId)=>{

}

export const login = async(params)=>{
  let url = DOMAIN+'/api/signIn',
      {account,password}=params;
  try{
    var result = await fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },body: JSON.stringify({
    account: account,
    password:password,
  })
    })
  }catch(e){
    console.log(e);
  }
 return result.json();
}
