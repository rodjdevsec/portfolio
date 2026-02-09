export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message, 'cf-turnstile-response': turnstileToken } = req.body;

        const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const verifyRes = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`
        });

        const verifyData = await verifyRes.json();
        console.log('Turnstile Verification Receipt:', verifyData);

        if (!verifyData.success) {
            return res.status(403).json({
                error: 'Security verification failed',
                details: verifyData['error-codes'] || []
            });
        }

        const formspreeUrl = `https://formspree.io/f/${process.env.FORMSPREE_ID}`;
        const formspreeRes = await fetch(formspreeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        });

        if (formspreeRes.ok) {
            return res.status(200).json({ success: true });
        } else {
            const errorData = await formspreeRes.json();
            return res.status(formspreeRes.status).json({ error: errorData.error || 'Failed to send message' });
        }

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
