import React from 'react'

const socials = [
    { href: 'https://github.com/dkkinyua', icon: 'fa-brands fa-github', label: 'GitHub' },
    { href: 'https://x.com/nyekssotrilll?t=t1b2X9PoKBlN11XM4Pt3YQ&s=09', icon: 'fa-brands fa-x-twitter', label: 'X (Twitter)' },
    { href: 'https://dev.to/dkkinyua', icon: 'fa-brands fa-dev', label: 'DEV Community' },
    { href: 'https://www.linkedin.com/in/denzel-kinyua-a73597277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
]

function TopHeader() {
    return (
        <div className='flex justify-center gap-6 py-3 text-2xl'>
            {socials.map((social) => (
                <a
                    key={social.label}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.label}
                    className='text-muted-foreground transition-colors hover:text-foreground'
                >
                    <i className={social.icon}></i>
                </a>
            ))}
        </div>
    );
}

export default TopHeader;
