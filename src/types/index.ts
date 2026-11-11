export type PlayerRole = 'batter' | 'bowler' | 'all-rounder';

export type VerificationStatus = 
  | 'Supported' 
  | 'Promising, thin' 
  | 'Mixed' 
  | 'Not supported' 
  | 'Insufficient sample' 
  | 'No pressure data';

export interface BatterData {
  id: string;
  rank: number;
  name: string;
  team: string; // e.g. "PBKS (IPL 2026 squad)"
  role: 'batter';
  medianPosition: number;
  firstSeen?: string;
  auctionEligibility: 'Unverified' | 'Retained Candidate' | 'In Squad' | 'Domestic Pool';
  retentionStatus: string;
  
  // Supplied Metrics (from screenshots/initial lists)
  supplied: {
    runs: number;
    strikeRate: number;
    matches: number;
  };
  
  // Verified Metrics (from ball-by-ball recalculation)
  verified: {
    balls: number;
    runs: number;
    strikeRate: number;
    normalStrikeRate: number | null; // null if no data
    normalBalls?: number;
    strikeRateDelta: number | null;
    dismissals: number;
    expectedDismissals: number;
    innsAboveExp: string; // e.g. "10/15"
    innsAboveExpCount: number;
    totalPressureInns: number;
    modelRank: number | null; // rank among 92 non-Pakistani batters
    status: VerificationStatus;
    rating: number | null;
    zScores: {
      value: number;
      dismissal: number;
      baseline: number;
      consistency: number;
    };
  };

  sampleFlag: 'Adequate' | 'Thin (<100 balls)' | 'Insufficient (<80 balls)' | 'Zero High-Pressure Balls';
  scoutingObservation: string;
  rrFit: string;
  strengths: string[];
  weaknesses: string[];
}

export interface BowlerData {
  id: string;
  rank: number;
  name: string;
  team: string;
  role: 'bowler';
  bowlingType: 'Pace' | 'Spinner' | 'Left-arm Pace';
  deathOversPct: number; // percentage of pressure balls in overs 16-20
  firstSeen?: string;
  auctionEligibility: 'Unverified' | 'Retained Candidate' | 'In Squad' | 'Domestic Pool';
  retentionStatus: string;

  // Supplied Metrics
  supplied: {
    wickets: number;
    balls: number;
    matches: number;
  };

  // Verified Metrics
  verified: {
    balls: number;
    wickets: number;
    expectedWickets: number;
    economy: number;
    normalEconomy: number;
    economyDelta: number; // normalEconomy - economy (positive means tighter under pressure)
    dotBallPct: number;
    spellsBelowExp: string; // e.g. "9/11"
    spellsBelowExpCount: number;
    totalPressureSpells: number;
    modelRank: number | null; // rank among 145 non-Pakistani bowlers
    status: VerificationStatus;
    rating: number | null;
    zScores: {
      value: number;
      wickets: number;
      baseline: number;
      consistency: number;
    };
  };

  sampleFlag: 'Adequate' | 'Thin (<100 balls)' | 'Insufficient (<60 balls)';
  scoutingObservation: string;
  rrFit: string;
  strengths: string[];
  weaknesses: string[];
}

export interface RRScoutingGap {
  area: string;
  rrRecord: string;
  leagueExpected: string;
  differential: string;
  diagnosis: string;
}

export interface RecommendationCategory {
  category: string;
  subtitle: string;
  tagColor: string;
  playerIds: string[];
  rationale: string;
}

