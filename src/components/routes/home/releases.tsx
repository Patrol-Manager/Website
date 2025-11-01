"use client"

import { Calendar, Download, GitBranch, Tag } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import type { GitHubRelease } from "../../../lib/types"
import { getBrowserPlatformInfo } from "../../../lib/utils"

interface ReleasesProps {
  releases: GitHubRelease[]
  onDownloadRelease: (platform: string, arch: string, version: string) => Promise<void>
}

const Releases = ({ releases, onDownloadRelease }: ReleasesProps) => {
  const sortedReleases = [...releases].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  )

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  if (sortedReleases.length === 0)
    return (
      <div className="text-center py-12 text-muted-foreground">
        <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No releases available yet</p>
      </div>
    )

  return (
    <div className="space-y-4">
      {sortedReleases.map((release) => (
        <Accordion type="single" collapsible className="w-full" key={release.id}>
          <AccordionItem
            value={`item-${release.id}`}
            className="border-2 rounded-lg px-4 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm"
          >
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full text-left">
                <div className="flex items-center gap-2 flex-1">
                  <Tag className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="font-bold text-lg">{release.tag_name}</span>
                  {release.prerelease && <Badge variant="secondary">Pre-release</Badge>}
                  {release.draft && <Badge variant="outline">Draft</Badge>}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(release.published_at)}</span>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pt-2 pb-6">
              {release.name && <h3 className="text-xl font-semibold mb-4">{release.name}</h3>}
              <p className="text-sm text-muted-foreground mb-2">
                <span className="font-medium">Version:</span> {release.id}
              </p>
              {release.body ? (
                <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                  <p className="text-muted-foreground whitespace-pre-wrap">{release.body}</p>
                </div>
              ) : (
                <p className="text-muted-foreground mb-6">No release notes available.</p>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>By {release.author?.login || "Unknown"}</span>
                  {release.assets && release.assets.length > 0 && (
                    <span>
                      {release.assets.length} asset{release.assets.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDownloadRelease(getBrowserPlatformInfo().os, getBrowserPlatformInfo().arch, release.tag_name)
                  }}
                >
                  <Download className="h-4 w-4" />
                  Download Release
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}

export default Releases