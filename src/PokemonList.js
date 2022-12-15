import React from 'react'

export default function PokemonList({pokemon}) {
  return (
    <div>
    {/* loop through map. */}
{pokemon.map(p => (
  <div key={p}>{p}</div>
))}
    </div>
  )
}
