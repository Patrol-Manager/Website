"use client"

import { motion } from "framer-motion"
import {
  Download,
  BarChart3,
  Shield,
  Cloud,
  Zap,
  Cpu,
  MonitorSmartphone,
  ArrowRight,
  Calendar,
  GitBranch,
  Tag,
} from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card"
import { useWebsiteSocket } from "../../../providers/socket-io"
import type { GitHubRelease } from "../../../lib/types"
import { getBrowserPlatformInfo } from "../../../lib/utils"

const OWNER = "Lincon07"
const REPO = "patrol-manager"

const Home = () => {
  const { clients } = useWebsiteSocket()
  const [releases, setReleases] = useState<GitHubRelease[]>([])

  const displayStats = [
    { label: "Active Users", value: clients.length ?? "—", icon: Shield },
    {
      label: "Patrols Logged",
      value: clients.reduce((acc, c) => acc + (c.patrolLogs?.length ?? 0), 0) ?? "—",
      icon: BarChart3,
    },
    {
      label: "Accrued Hours",
      value: clients.reduce(
        (acc, c) => acc + (c.patrolLogs?.reduce((a, log) => a + (log.Duration ?? 0), 0) ?? 0),
        0,
      ) ?? "—",
      icon: Zap,
    },
    {
      label: "Top Department",
      value: (() => {
        const deptCount: Record<string, number> = {}
        clients.forEach((client) =>
          client.patrolLogs?.forEach((log) => {
            if (log.Department) deptCount[log.Department] = (deptCount[log.Department] || 0) + 1
          }),
        )
        const top = Object.entries(deptCount).sort((a, b) => b[1] - a[1])[0]
        return top ? top[0] : "—"
      })(),
      icon: Cloud,
    },
  ]

  const handleDownloadVersion = async (platform: string, arch: string, version: string) => {
    try {
      const apiBase = import.meta.env.VITE_API_SERVER
      if (!apiBase) throw new Error("Missing VITE_API_SERVER in env")
      const res = await axios.get(`${apiBase}/app-download`, {
        params: { platform: `${platform}-${arch}`, version },
      })
      const data = res.data
      if (!data?.url) return alert("No installer found for this version.")
      window.open(data.url, "_blank")
    } catch (err: any) {
      console.error(err)
      alert("Download failed.")
    }
  }

  const handleGetReleases = async () => {
    try {
      const { data } = await axios.get(`https://api.github.com/repos/${OWNER}/${REPO}/releases`, {
        headers: { Accept: "application/vnd.github+json" },
      })
      setReleases(data)
    } catch (err) {
      console.error("Error fetching releases:", err)
    }
  }

  useEffect(() => {
    handleGetReleases()
  }, [])

  return (
    <div className="flex w-full min-h-screen flex-col items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/40 to-background">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl text-center pt-20 pb-16"
      >
        <Badge variant="secondary" className="mb-4 px-4 py-1.5">
          <Zap className="h-3.5 w-3.5 mr-1.5 inline" />
          Next-Gen Patrol Management
        </Badge>

        <h1 className="text-6xl font-extrabold mb-4 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Patrol Manager
          </span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Manage, track, and analyze your patrols in real-time — built for performance and total immersion.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="gap-2 text-base px-8 shadow-lg hover:shadow-xl"
            onClick={() => handleDownloadVersion("windows", "x64", "latest")}
          >
            <Download className="h-5 w-5" /> Download App <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2 px-8 bg-transparent">
            <BarChart3 className="h-5 w-5" /> View Dashboard
          </Button>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl"
      >
        {displayStats.map((s, i) => (
          <Card key={i} className="border-2 hover:border-primary/60 transition-all bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <s.icon className="h-6 w-6 mb-2 text-primary" />
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent mb-1">
                {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
              </p>
              <span className="text-sm text-muted-foreground font-medium">{s.label}</span>
            </CardContent>
          </Card>
        ))}
      </motion.section>

      {/* Releases */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mt-24 mb-20"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Latest Releases</h2>
          <p className="text-muted-foreground text-lg">
            Download new updates, explore changelogs, and stay ahead.
          </p>
        </div>

        {releases.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            <GitBranch className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>No releases available yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {releases.slice(0, 6).map((r) => (
              <Card
                key={r.id}
                className="group relative border-2 hover:border-primary/60 transition-all bg-card/60 backdrop-blur-sm"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Tag className="h-4 w-4 text-primary" />
                    {r.tag_name}
                    {r.prerelease && <Badge variant="secondary">Pre-release</Badge>}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />{" "}
                    {new Date(r.published_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-full">
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-4">
                    {r.body || "No release notes provided."}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent mt-auto"
                    onClick={() =>
                      handleDownloadVersion(getBrowserPlatformInfo().os, getBrowserPlatformInfo().arch, r.tag_name)
                    }
                  >
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.section>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-auto border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Patrol Manager • macOS • Windows • Stream Deck Integration coming soon
      </footer>
    </div>
  )
}

export default Home