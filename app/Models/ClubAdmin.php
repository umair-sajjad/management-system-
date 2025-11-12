<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClubAdmin extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'club_name',
        'club_type',
        'position',
    ];

    /**
     * Get the user that owns the club admin profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
