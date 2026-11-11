import { BATTERS_DATA, BOWLERS_DATA } from '../data/cricketData';

export function downloadBattersCSV() {
  const headers = [
    'Rank (Supplied)',
    'Player Name',
    'Team / Squad',
    'Status',
    'Model Rank (of 92)',
    'Reliability Rating',
    'Supplied Runs',
    'Supplied SR',
    'Supplied Matches',
    'Verified Balls',
    'Verified Runs',
    'Verified SR',
    'Normal SR',
    'SR Delta',
    'Dismissals',
    'Expected Dismissals',
    'Innings >= Expected',
    'Sample Size Flag',
    'Auction Status'
  ];

  const rows = BATTERS_DATA.map(b => [
    b.rank,
    `"${b.name}"`,
    `"${b.team}"`,
    b.verified.status,
    b.verified.modelRank ?? 'N/A',
    b.verified.rating ?? 'N/A',
    b.supplied.runs,
    b.supplied.strikeRate,
    b.supplied.matches,
    b.verified.balls,
    b.verified.runs,
    b.verified.strikeRate,
    b.verified.normalStrikeRate ?? 'N/A',
    b.verified.strikeRateDelta ?? 'N/A',
    b.verified.dismissals,
    b.verified.expectedDismissals,
    `"${b.verified.innsAboveExp}"`,
    `"${b.sampleFlag}"`,
    `"${b.retentionStatus}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'RR_Top10_Batters_Pressure_Scouting.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadBowlersCSV() {
  const headers = [
    'Rank (Supplied)',
    'Player Name',
    'Team / Squad',
    'Bowling Type',
    'Status',
    'Model Rank (of 145)',
    'Reliability Rating',
    'Supplied Wickets',
    'Supplied Balls',
    'Supplied Matches',
    'Verified Balls',
    'Verified Wickets',
    'Expected Wickets',
    'Pressure Economy',
    'Normal Economy',
    'Economy Delta (Saved)',
    'Dot Ball Pct (%)',
    'Death Overs Pct (%)',
    'Spells <= Expected',
    'Sample Size Flag',
    'Auction Status'
  ];

  const rows = BOWLERS_DATA.map(b => [
    b.rank,
    `"${b.name}"`,
    `"${b.team}"`,
    b.bowlingType,
    b.verified.status,
    b.verified.modelRank ?? 'N/A',
    b.verified.rating ?? 'N/A',
    b.supplied.wickets,
    b.supplied.balls,
    b.supplied.matches,
    b.verified.balls,
    b.verified.wickets,
    b.verified.expectedWickets,
    b.verified.economy,
    b.verified.normalEconomy,
    b.verified.economyDelta,
    `${b.verified.dotBallPct}%`,
    `${b.deathOversPct}%`,
    `"${b.verified.spellsBelowExp}"`,
    `"${b.sampleFlag}"`,
    `"${b.retentionStatus}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'RR_Top10_Bowlers_Pressure_Scouting.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

