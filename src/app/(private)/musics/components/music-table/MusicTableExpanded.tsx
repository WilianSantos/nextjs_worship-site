import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import {
  MusicSerializers,
  PraiseMusicMusics200MusicsItem
} from '@/client/schemas'
import { formatToParagraph } from '@/utils/formatToParagraph'

export function MusicTableExpanded({
  music,
  onBack
}: {
  music: MusicSerializers | PraiseMusicMusics200MusicsItem
  onBack: () => void
}) {
  return (
    <Card className="p-5 text-xs overflow-auto">
      <h3>{music.music_title}</h3>
      <p>{music.author}</p>
      <p>{music.music_tone}</p>
      <ul className="flex gap-1">
        {music.category?.map((item) => (
          <li key={item.id}>{item.category_name}</li>
        ))}
      </ul>
      <div
        dangerouslySetInnerHTML={{
          __html: formatToParagraph(music.music_text)
        }}
      />
      <div>
        <Button onClick={onBack}>Voltar</Button>
      </div>
    </Card>
  )
}
