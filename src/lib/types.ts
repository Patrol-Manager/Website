

export interface SocketActivity {
  fromSocketId: string;
  message: string;
  timestamp: Date;
}

export type ConnectedClient = {
  avatar: string;
  name: string;
  websiteID: number;
  discordID: string;
  version: string;
  patrolLogs: PatrolLogs[];
  status: status;
  allowFriendRequests: boolean;
  friends: Friends[];
  socketId: string;
  teamspeakID: number;
  connectedAt: Date;
  isOnline: boolean;
};
export interface PatrolLogs {
  id: number;
  Department: string | null;
  Server: string | null;
  Email: string;
  WebsiteID: string;
  Name: string;
  Callsign: string;
  Rank: string;
  startDate: Date;
  endDate: Date;
  SubdivisionUsages: string[];
  TZ: string;
  EMS_CERT: "EMR" | "EMT-B" | "EMT-P" | "CC-EMT-P" | "" | null;
  UtilizedDistricts: string[];
  TEU_tow_Activations: number;
  SID_IDN: string | null;
  PA_BadgeNumber: string | null;
  Ranks: Record<string, string>;
  LSPD_Byc_Foot_Patrol: string[];
  civPrioCount: number;
  Duration: number;
  Active: boolean;
  Paused: boolean;
  SubdivisionUsage: SubdivisionUsage[];
  visitCounts: Record<string, number>;
}

export interface SubdivisionUsage {
  id?: number;
  Subdivision: { Alias: string; FullName: string };
  StartTime: Date;
  EndTime: Date | null;
  Duration: number;
  Active: boolean;
  Paused: boolean;
  Log: number;
  BACO_Operations: string[];
  PA_Activations: PAActivation[];
  PA_Arrests: number | null;
  SID_Arrests: number | null;
  sid_utilized_teams: string[];
  TEU_TowActivations: number | null;
  TEU_Calls: TEUCall[];
  BSO_K9_Position: string | null;
  adat_dui_checkpoint: boolean | null;
  bso_K9_Calls: number | null;
  bte_Mbu_Utlized_Checkpoint: boolean | null;
}

export interface PAActivation {
  type: string;
  count: number;
}

export interface TEUCall {
  type: string;
  count: number;
}


export interface status {
  selectedDepartment: DepartmentType | null;
  selectedServer: ServerType | null;
  isOnDuty: boolean | null;
  mainPatrolDuration: number | null;
  playerLocation: { x: number; y: number };
  closestLocation: Location | null;
}

export interface Department {
  Alias: string;
  FullName: string;
}

export interface Server {
  Alias: string;
  FullName: string;
}

export interface DepartmentType extends Department {
  color: string;
  Icon: string;
  Image?: string;
  Ranks: string[];
  Subdivisions: { Alias: string; FullName: string }[];
  hoursMet?: boolean;
  disabled?: boolean;
}

export interface ServerType extends Server {
  disabled: boolean;
}

export interface Friends {
  name: string;
  websiteID: string;
  discordID: string;
  avatar: string;
  accepted_date: Date;
}


export interface GitHubRelease {
  id: number
  node_id: string
  tag_name: string
  name: string
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  updated_at: string
  immutable: boolean
  body: string | null

  html_url: string
  tarball_url: string
  zipball_url: string
  url: string
  upload_url: string
  assets_url: string
  target_commitish: string

  author: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    html_url: string
    type: string
    site_admin: boolean
  }

  assets: {
    url: string
    browser_download_url: string
    id: number
    name: string
    label: string | null
    state: string
    content_type: string
    size: number
    download_count: number
    created_at: string
    updated_at: string
  }[]

  body_html?: string
  body_text?: string
}