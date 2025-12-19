import { NextResponse } from 'next/server'

// ACME Challenge Token for SSL verification
const ACME_TOKEN = "KS_wbIRm6oo3C6LqaHAe2m7CdFNvl6YZa3MO2lrJbalH-NMxd8BkEOay-AEnVXEp"
const ACME_KEY = "KS_wbIRm6oo3C6LqaHAe2m7CdFNvl6YZa3MO2lrJbalH-NMxd8BkEOay-AEnVXEp.M0-GObbb5ePi63ASQsPKBrDqfgayGnOWpyrEF0nHqug"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params

    if (token === ACME_TOKEN) {
        return new NextResponse(ACME_KEY, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        })
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
