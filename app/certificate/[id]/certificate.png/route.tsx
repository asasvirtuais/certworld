import { server } from '@/data/server'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params } : { params: Promise<{ id:string }> }) {

    // const { id } = await params

    // const certificate = await server.service('Certificates').find({ table: 'Certificates', id })

    return new ImageResponse(
        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#18181B',
            marginBottom: '8px',
          }}>
            CERTIFICATE OF COMPLETION
          </h1>
          <div
            style={{
                width: '64px',
                height: '4px',
                background: '#3B82F6',
                margin: 'auto',
                marginBottom: '32px',
            }}/>

          <p
            style={{
                color: '#3F3F46',
                marginBottom: '16px',
            }}>This certifies that</p>

          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#18181B',
            marginBottom: '24px',
          }}>{'User Name'}</h2>

          <p style={{
            fontSize: '16px',
            color: '#3F3F46',
            marginBottom: '24px',
          }} >has successfully completed</p>

          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#18181B',
            marginBottom: '16px',
          }}>{'Course Name'}</h2>

          <p style={{
            color: '#71717A'
          }}>Completed on {'Completion Date'}</p>
        </div>
    ), {
      options: {
        width: 300,
        height: 100,
      }
    }
}
