import './mailList.scss'

const MailList = () => {
  return (
    <div className='mail'>
        <h1 className="mailTitle">Save time , Stay Updated!</h1>
        <span className="mailDesc">Sign up and we'll send  Our best deals to you</span>
        <div className="mailInputContainer">
            <input type='text' placeholder='Enter Mail' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList