import { useRef, useState } from "react";


function MainPage({onSignIn}) {
  const [isSigningUp, setIsSigningUp] = useState(false)
  return (
    <main>
      <h1>Home Page</h1>
      <div>
        <form
          style={{ display: "flex", flexDirection: "column", padding: "10px" }}
          onSubmit={e => {
            e.preventDefault()
            const data= new FormData(e.currentTarget)
            fetch('http://localhost:4000/'+ (isSigningUp?'signup':'login'),{
              method: "post",
              body: JSON.stringify({email: data.get('email')}),
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(x => x.json()).then(response => {
              if (!response.userName){
                return
              }
              window.localStorage.setItem('userName', response.userName) //local storage 
              onSignIn(response.userName)
            })
          }} 
        >
          <h3 style={{color:'white'}}>{isSigningUp?'Sign Up':'Sign In'}</h3>
          <label style={{color:'white'}} htmlFor="email">Email</label>
          <input
            
            name="email"
            id="email"
            type="text"
            placeholder="Email or Phone"
          />
          <label style={{color:'white'}} htmlFor="password">Password</label>
          <input
            
            name="password"
            id="password"
            type="password"
            placeholder="password"
          />
          <button type="submit">{isSigningUp?'Sign Up':'Sign In'}</button>
        </form>
        <button onClick={() => setIsSigningUp(x => !x)}>{isSigningUp?'Already have an account?':"Don't have an account?"}</button>
      </div>
    </main>
  );
}

export default MainPage;
