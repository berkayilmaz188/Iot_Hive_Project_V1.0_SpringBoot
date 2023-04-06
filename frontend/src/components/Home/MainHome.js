import React from 'react';
function MainHome() {

    return(
        <body>
    
<main>
  <div className="container py-4">
    
  <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">BeehiLive a Hos Geldiniz !</h1>
        <h5>Uyeliniz yoksa hemen <a href="/register"> tıklayarak </a> uyelik olusturabilirsiniz.</h5>
        <h5>Uyeliginiz varsa sol ustteki login butonu ile giris yapabilirsiniz.</h5>
        
        
      </div>
      
    </div>


    <div className="row align-items-md-stretch">
      <div className="col-md-6">
        <div className="h-100 p-5 text-bg-dark rounded-3">
          <h2>Demo Surum</h2>
          <p>BeeHiliv projesinin demo versiyonudur.</p>
          
        </div>
      </div>
      <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-3">
          <h2>Kovaninizi 7/24 izleyin</h2>
          <p>BeeHilive sayesinde ari Kovaninizi istiyorsaniz 7/24 izleyebilirsiniz !</p>
  
        </div>
      </div>
    </div>

    
  </div>
</main>


    
  </body>
    )
}

export default MainHome;