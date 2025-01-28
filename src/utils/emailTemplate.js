const emailTemplate = (otp) => {
    return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style=" margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="https://culinaryconnectngn.com" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600;">
            <img width="200" src="" alt="CulinaryConnect" />
            <p style="text-color:blue">Stulivery</p>
          </a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing CulinaryConnect. Use the following OTP to complete your Sign Up procedures. OTP is valid for 2 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:1.1em">Or</p>
        <p style="text-align:center"><a href="">click here</a></p>
        <p style="font-size:0.9em;">Regards,<br /><img width="200" src="" alt="CulinaryConnect" /></p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>CulinaryConnect</p>
          <p>culinaryconnectngn.com</p>
          <p>Nigeria</p>
        </div>
      </div>
    </div>`;
};

module.exports = {
    emailTemplate,
};
