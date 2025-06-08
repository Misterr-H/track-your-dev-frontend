import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    // Extract token from HTTP-only cookie
    const githubToken = request.cookies.get('github_token')?.value;

    console.log(githubToken);

    if (!githubToken) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    try {
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'trackyourdev'
            }
        });

        console.log(response);
        
        if (response.ok) {
            const userData = await response.json();
            return NextResponse.json({ 
                authenticated: true, 
                user: userData 
            });
        } else {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
    } catch (error) {
        console.error('GitHub verification error:', error);
        return NextResponse.json({ authenticated: false, error: 'Server error' }, { status: 500 });
    }
}