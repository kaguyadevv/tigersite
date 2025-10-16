import React, { useState, useEffect } from 'react';
import { Settings, Twitter, Users, TrendingUp } from 'lucide-react';

export default function TigerToken() {
  // CONFIGURATION - Update these links easily
  const LINKS = {
    pumpFun: 'https://pump.fun/your-token-address',
    chart: 'https://dexscreener.com/solana/your-pool-address',
    twitter: 'https://twitter.com/your-handle',
    telegram: 'https://t.me/your-group',
    contractAddress: 'placeholder for contract address'
  };

  const [prices, setPrices] = useState({
    current: '...',
    marketCap: '...'
  });

  const tigerLogo = process.env.PUBLIC_URL + "/tigerheadon.png";

  useEffect(() => {
    console.log('Component mounted, setting up fetch...');
    
    const fetchStats = async () => {
      try {
        console.log('Attempting to fetch stats...');
        const response = await fetch('https://rainbackend.vercel.app/api/stats', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        console.log('Response received:', response.status);
        
        if (!response.ok) {
          console.error('Response not OK:', response.status);
          return;
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);
        
        if (data.priceUsd && data.marketCap) {
          const newPrices = {
            current: `$${parseFloat(data.priceUsd).toFixed(8)}`,
            marketCap: `$${(data.marketCap / 1000).toFixed(2)}K`
          };
          console.log('Setting prices:', newPrices);
          setPrices(newPrices);
        } else {
          console.log('Data missing priceUsd or marketCap');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '120vh', background: 'var(--bg-gradient)', color: 'var(--text-color)', margin: 0, padding: 0, width: '100vw', overflowX: 'hidden' }}>
      <button style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '40px',
        height: '40px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 50
      }}>
        <Settings style={{ width: '24px', height: '24px', color: 'white' }} />
      </button>

      {/* Hero Section */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 20px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: 'clamp(48px, 10vw, 120px)',
            fontWeight: 'bold',
            color: 'var(--heading-color)',
            letterSpacing: '4px',
            marginBottom: '20px'
          }}>$TIGER</h1>
          <img src={tigerLogo} alt="Tiger Logo" style={{
            width: '150px',
            height: '150px',
            margin: '20px auto 32px',
            borderRadius: '50%',
            border: '2px solid #101010	',
            objectFit: 'cover',
            /* Shift the image inside the circular frame down a bit. Tweak '50% 60%' as needed. */
            objectPosition: '70% 30%',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)'
          }} />
          <p style={{ fontSize: '18px', color: 'grey' , marginBottom: '10px' }}>THE APEX HAS ARRIVED.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', gap: '80px', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '8px' }}>PRICE</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--accent)' }}>{prices.current}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '8px' }}>MARKET CAP</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--accent)' }}>{prices.marketCap}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '48px', padding: '0 16px' }}>
          <button 
            onClick={() => window.open(LINKS.pumpFun, '_blank')}
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--primary-pill-bg)',
                color: 'var(--primary-pill-text)',
                fontWeight: '600',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer'
              }}>
            Buy on Pump.fun
          </button>
          <button 
            onClick={() => window.open(LINKS.chart, '_blank')}
            style={{
              padding: '12px 20px',
              backgroundColor: '#101010	',
              color: 'var(--pill-ghost-text)',
              borderRadius: '24px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
            <TrendingUp style={{ width: '16px', height: '16px' }} />
            View Chart
          </button>
          <button 
            onClick={() => window.open(LINKS.twitter, '_blank')}
            style={{
              padding: '17px 20px',
              backgroundColor: '#101010	',
              color: 'var(--pill-ghost-text)',
              borderRadius: '24px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
            <Twitter style={{ width: '16px', height: '16px' }} />
            X Page
          </button>
          <button 
            onClick={() => window.open(LINKS.telegram, '_blank')}
            style={{
              padding: '12px 20px',
              backgroundColor: '#101010	',
              color: 'var(--pill-ghost-text)',
              borderRadius: '24px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
            <Users style={{ width: '16px', height: '16px' }} />
            Community
          </button>
        </div>

        <div style={{ width: '100%', maxWidth: '900px', padding: '0 16px' }}>
          <p style={{ fontSize: '14px', color: 'var(--muted)', textAlign: 'center', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>CONTRACT ADDRESS</p>
          <div style={{
            backgroundColor: '#101010	',
            borderRadius: '50px',
            padding: '20px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '14px', fontFamily: 'monospace', textAlign: 'center' }}>
              {LINKS.contractAddress}
            </span>
            <button 
              onClick={() => navigator.clipboard.writeText(LINKS.contractAddress)}
              style={{
                padding: '10px 20px',
                backgroundColor: 'white',
                color: 'black',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
               Copy
            </button>
          </div>
        </div>
      </div>

      {/* Tokenomics */}
  <div style={{ padding: '80px 20px', background: 'var(--bg-gradient)' }}>
        <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 'bold', textAlign: 'center', marginBottom: '64px' }}>
          Tokenomics
        </h2>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {[
            { title: 'TOTAL SUPPLY', value: '1B', subtitle: 'Fixed forever' },
            { title: 'TAX', value: <a href="https://pump.fun/docs/fees" target="_blank" rel="noopener noreferrer">Link Here</a>, subtitle: 'Platform fees apply' },
            { title: 'LIQUIDITY', value: 'Locked', subtitle: 'Safe & Secure' },
            { title: 'CONTRACT', value: 'Verified', subtitle: 'Transparent' }
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: '#101010',
              borderRadius: '50px',
              padding: '20px',
              textAlign: 'center',
              border: '1px solid black'
            }}>
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '0px' }}>{item.title}</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '30px' }}>{item.value}</p>
              <p style={{ fontSize: '14px', color: 'var(--muted-light)' }}>{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Lore */}
  <div style={{ padding: '80px 20px', background: 'var(--bg-gradient)' }}>
        <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 'bold', textAlign: 'center', marginBottom: '64px' }}>
          The Lore
        </h2>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            { title: 'The Awakening', subtitle: 'ORIGIN', text: 'Born from the ashes of forgotten beasts — the Tigers rise again to rule the jungle.', img: process.env.PUBLIC_URL + '/tigermeme1.jpg', style: { objectPosition: '50% 40%' }},
            { title: 'The Way of the Stripe', subtitle: 'PHILOSOPHY', text: "Strength, stealth, and style. We chose tigers because kings don't bark — they roar.", img: process.env.PUBLIC_URL + '/tigermeme2.png', style: { objectPosition: '80% 60%' }},
            { title: 'The Hunt Ahead', subtitle: 'GOALS', text: 'To claim our territory across the blockchain jungle — one roar at a time.', img: process.env.PUBLIC_URL + '/tigerheadon.png', style: { objectPosition: '50% 40%' } }

          ].map((card, i) => (
            <div key={i} style={{
              backgroundColor: '#101010	',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid Black'
            }}>
              <div style={{
                height: '192px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#101010	'
              }}>
                <img
                  src={card.img}
                  alt={card.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    // merge per-card style (e.g. objectPosition) if provided
                    ...(card.style || {})
                  }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>{card.subtitle}</p>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>{card.title}</h3>
                <p style={{ color: 'var(--muted-light)' }}>{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}