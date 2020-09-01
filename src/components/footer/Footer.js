import React from "react"

function Footer() {
    // repository for this project
    let githubRepo = "https://github.com/fedeemilo/rick-morty-react-challenge"

    // my portfolio
    let myPortfolio = "https://federico-milone.vercel.app"

    return (
        <div className='footer'>
            <div className='d-flex justify-content-between'>
                <p className='footer__name'>
                    <ion-icon name='person-circle-outline'></ion-icon>Federico
                    Milone
                </p>
                <div className='footer__links d-flex'>
                    <a
                        href={githubRepo}
                        className='footer__links--repo'
                        target='_blank'
                        rel="noopener noreferrer">
                        <ion-icon name='logo-github'></ion-icon>
                    </a>
                    <a
                        href={myPortfolio}
                        className='footer__links--repo'
                        target='_blank'
                        rel="noopener noreferrer">
                        <ion-icon name='globe-outline'></ion-icon>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
