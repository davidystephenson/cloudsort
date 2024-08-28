import { ChangeEvent, useRef, useState } from 'react'
import { HStack, Icon, Text } from '@chakra-ui/react'
import Papa from 'papaparse'
import { useHotkeys } from 'react-hotkeys-hook'
import { BsCloudUpload } from 'react-icons/bs'
import { CritickerRow } from '../types/hosting'
import { Movie, UploadProps } from '../types/shared'
import { useHttpsCallable } from 'react-firebase-hooks/functions'
import { useFunctions } from 'reactfire'
import { ButtonView } from '../button/ButtonView'

export default function ImportButtonView (): JSX.Element {
  const functions = useFunctions()
  const [
    cloudUpload,
    cloudUploadLoading,
    cloudUploadError
  ] = useHttpsCallable<UploadProps>(functions, 'upload')
  const [parsing, setParsing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useHotkeys('i', () => {
    inputRef.current?.click()
  })
  const loading = cloudUploadLoading || parsing
  async function parseCriticker ({
    data
  }: {
    data: CritickerRow[]
  }): Promise<void> {
    const updatedAt = Date.now()
    const movies: Movie[] = data.map((row: CritickerRow) => {
      const date = new Date(row[' Date Rated'])
      const score = Number(row.Score)
      const year = Number(row[' Year'])
      const movie: Movie = {
        date,
        id: row[' IMDB ID'],
        imdbId: row[' IMDB ID'],
        review: row[' Mini Review'],
        score,
        name: row[' Film Name'],
        year,
        updatedAt,
        url: row[' URL']
      }
      return movie
    }).slice(0, 5)
    setParsing(false)
    await cloudUpload({ movies, listId: 'fake' })
  }
  function handleFileChange (e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0]
    if (file == null) {
      throw new Error('There is no file.')
    }
    setParsing(true)
    Papa.parse<CritickerRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        void parseCriticker({ data })
      }
    })
    if (inputRef.current == null) {
      throw new Error('There is no inputRef.')
    }
    inputRef.current.value = ''
  }
  function handleClick (): void {
    inputRef.current?.click()
  }
  return (
    <>
      <ButtonView
        loading={loading}
        error={cloudUploadError}
        onClick={handleClick}
        fontSize='sm'
        size='xs'
        variant='solid'
      >
        <HStack>
          <Text>[i]mport</Text>
          <Icon as={BsCloudUpload} />
        </HStack>
      </ButtonView>
      <input
        hidden
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
      />
    </>
  )
}
