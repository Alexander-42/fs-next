import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { getUserWithReadingListByUsername } from "../services/users"
import { TokenGenerator } from "../components/TokenGenerator"
import { markReadingListEntryAsRead } from "../actions/readingList"
import type { ReadingListEntry } from "../types"

const MePage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/login")
  }

  const user = await getUserWithReadingListByUsername(currentUser.username)
  const readingList = user?.readingList ?? []
  const unread = readingList.filter((entry) => !entry.read)
  const read = readingList.filter((entry) => entry.read)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-strong">
        My profile
      </h1>

      <section
        data-testid="user-profile"
        className="rounded-lg border border-line bg-surface p-4"
      >
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-foreground">
          <dt className="font-medium text-muted">Name</dt>
          <dd data-testid="user-name">{currentUser.name}</dd>
          <dt className="font-medium text-muted">Username</dt>
          <dd data-testid="user-username">{currentUser.username}</dd>
        </dl>
      </section>

      <section
        data-testid="api-token-section"
        className="space-y-3 rounded-lg border border-line bg-surface p-4"
      >
        <h2 className="text-xl font-semibold text-strong">API token</h2>
        <TokenGenerator initialToken={currentUser.token} />
      </section>

      <section data-testid="reading-list-section" className="space-y-6">
        <h2 className="text-xl font-semibold text-strong">Reading list</h2>

        {readingList.length === 0 && (
          <p
            data-testid="empty-reading-list"
            className="rounded-lg border border-dashed border-line p-8 text-center text-sm text-muted"
          >
            Nothing saved yet. Add blogs from their page.
          </p>
        )}

        <div data-testid="unread-section" className="space-y-3">
          <h3 className="text-lg font-semibold text-strong">Unread</h3>
          <ReadingListEntries
            entries={unread}
            emptyTestId="no-unread-blogs"
            emptyText="Nothing unread."
          />
        </div>

        <div data-testid="read-section" className="space-y-3">
          <h3 className="text-lg font-semibold text-strong">Read</h3>
          <ReadingListEntries
            entries={read}
            emptyTestId="no-read-blogs"
            emptyText="Nothing marked as read yet."
          />
        </div>
      </section>
    </div>
  )
}

interface ReadingListEntriesProps {
  entries: ReadingListEntry[]
  emptyTestId: string
  emptyText: string
}

const ReadingListEntries = ({
  entries,
  emptyTestId,
  emptyText,
}: ReadingListEntriesProps) => {
  if (entries.length === 0) {
    return (
      <p
        data-testid={emptyTestId}
        className="rounded-lg border border-dashed border-line p-8 text-center text-sm text-muted"
      >
        {emptyText}
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-baseline gap-3">
          <Link
            href={`/blogs/${entry.blog.id}`}
            className="font-medium text-accent-ink underline-offset-2 hover:underline"
          >
            {entry.blog.title}
          </Link>
          {!entry.read && (
            <form action={markReadingListEntryAsRead}>
              <button
                type="submit"
                name="entryId"
                value={entry.id}
                data-testid={`mark-read-${entry.id}`}
                className="rounded border border-line px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-accent-ink hover:text-accent-ink"
              >
                mark as read
              </button>
            </form>
          )}
        </li>
      ))}
    </ul>
  )
}

export default MePage
